import db from '@server/config/db.js'
import { Op } from 'sequelize'
import { intersection, union } from 'lodash'
import cellType from './cellType'
import dataSet from './dataset'

// the schema directory can only access from ../../
const deSchema = '../schema/de.js'
const deMetaSchema = '../schema/de_meta.js'

const screadDb = db.scread

// use sequelize to import table structure
const de = screadDb.import(deSchema)
const deMeta = screadDb.import(deMetaSchema)

const combinations = (collection, combinationLength) => {
  let head,
    tail,
    result = []
  if (combinationLength > collection.length || combinationLength < 1) {
    return []
  }
  if (combinationLength === collection.length) {
    return [collection]
  }
  if (combinationLength === 1) {
    return collection.map((element) => [element])
  }
  for (let i = 0; i < collection.length - combinationLength + 1; i++) {
    head = collection.slice(i, i + 1)
    tail = combinations(collection.slice(i + 1), combinationLength - 1)
    for (let j = 0; j < tail.length; j++) {
      result.push(head.concat(tail[j]))
    }
  }
  return result
}

const getDeTableById = async function (id, other) {
  const result = await de.findAndCountAll({
    where: {
      a_data_id: id,
      b_data_id: other.second_id,
      cluster: other.ct,
      type: other.type
    },
    attributes: ['avg_logFC', 'p_val_adj', 'pct_1', 'pct_2', 'gene'],
    order: screadDb.col('p_val_adj')
  })

  return result
}

const getSubclusterDeTableById = async function (id, other) {
  const result = await de.findAndCountAll({
    where: {
      a_data_id: id,
      b_data_id: id,
      ct: other.ct.substring(0, 3).toLowerCase(),
      cluster: other.second_id,
      type: 'subcluster'
    },
    attributes: ['avg_logFC', 'p_val_adj', 'pct_1', 'pct_2', 'gene'],
    order: screadDb.col('p_val_adj')
  })
  return result
}

const getDeTypeById = async function (id) {
  const result = await deMeta.findAll({
    where: {
      [Op.or]: [{ data_id: id }, { b_data_id: id }]
    }
  })
  return result
}

const getAllDeType = async function (id) {
  const result = await deMeta.findAll()
  return result
}

const getDeGeneByName = async function (id) {
  const result = await de.findAndCountAll({
    where: {
      gene: id
    }
  })
  return result
}

const getControlledIds = async function (id) {
  let result = await deMeta.findAll({
    where: {
      // data_id: id,
      b_data_id: id,
      description: 'Disease vs control (same region)'
    },
    // attributes: ["b_data_id"]
    attributes: ['data_id']
  })
  result = result.map((r) => r.data_id) // return obly array of data_id
  return result
}

const getComparationDeg = async function (
  ctShortName,
  ctLongName,
  diseaseId,
  top,
  direction
) {
  const ctrlIds = await getControlledIds(diseaseId)
  const attrs = ['ct', 'gene', 'avg_logFC', 'a_data_id', 'b_data_id']
  let filter = {
    cluster: ctLongName,
    ct: ctShortName,
    a_data_id: diseaseId,
    b_data_id: ctrlIds,
    p_val_adj: { [Op.lt]: 0.05 }
  }
  if (direction == 'up') {
    filter.avg_logFC = { [Op.gt]: 0.5 }
  } else {
    filter.avg_logFC = { [Op.lt]: -0.5 }
  }
  let result = await de.findAll({
    where: filter,
    order: [['p_val_adj', 'DESC']],
    limit: top,
    attributes: attrs
  })
  // get only attrs in the object and give them a 'rank' by order
  result = result.map((curr, index) => {
    let ret = {}
    for (const key of attrs) {
      ret[key] = curr[key]
    }
    ret['rank'] = index + 1
    return ret
  })
  return result
}

const getComparation = async function (
  region,
  species,
  top,
  overlapThreshold,
  direction
) {
  const cellTypeMap = await cellType.getCellTypeList()
  const diseaseIds = await dataSet.getDataIds(region, species, 'Disease')
  // console.log(diseaseIds)
  let listOfGeneList = {}
  let degTable = []
  for (const [ctShortName, ctLongName] of Object.entries(cellTypeMap)) {
    let ctDegTable = []
    let ctGeneList = []
    for (const diseaseId of diseaseIds) {
      // console.log(ctShortName, ctLongName, diseaseId)
      const result = await getComparationDeg(
        ctShortName,
        ctLongName,
        diseaseId,
        top,
        direction
      )
      if (result.length > 0) {
        // get the gene list from the result
        // and save the result
        const genes = result.map((r) => r.gene)
        ctGeneList.push(genes)
        ctDegTable = ctDegTable.concat(result)
      }
    }
    // get the intersection of genes of the diseases by overlapthreshold
    const idxs = [...Array(diseaseIds.length).keys()]
    const combn = combinations(idxs, overlapThreshold)

    const combGenes = combn.map((comb) => {
      const geneComb = ctGeneList.filter((gene, idx) => comb.indexOf(idx) > -1)
      return intersection(...geneComb)
    })
    const overlapGenes = union(...combGenes)

    ctDegTable = ctDegTable.filter((x) => overlapGenes.includes(x.gene))
    ctDegTable = ctDegTable.map((x) => {
      x['total_comparison'] = diseaseIds.length
      return x
    })
    degTable = degTable.concat(ctDegTable)
    listOfGeneList[ctShortName] = overlapGenes
  }

  // count the ct-gene pairs, and sum up the rank for avg
  const ct_gene = new Map()
  degTable.reduce((map, ct_g) => {
    if (map.has(ct_g.ct)) {
      let ct = map.get(ct_g.ct)
      if (ct.has(ct_g.gene)) {
        let g = ct.get(ct_g.gene)
        g.set('cnt', g.get('cnt') + 1)
        g.set('rank', g.get('rank') + ct_g.rank)
      } else {
        let tmp = new Map()
        tmp.set('cnt', 1)
        tmp.set('rank', ct_g.rank)
        ct.set(ct_g.gene, tmp)
      }
    } else {
      let tmp = new Map()
      tmp.set('cnt', 1)
      tmp.set('rank', ct_g.rank)
      let tmp2 = new Map()
      tmp2.set(ct_g.gene, tmp)
      map.set(ct_g.ct, tmp2)
    }
    return map
  }, ct_gene)
  degTable.map((deg) => {
    let cnt = ct_gene
      .get(deg.ct)
      .get(deg.gene)
      .get('cnt')
    let ranksum = ct_gene
      .get(deg.ct)
      .get(deg.gene)
      .get('rank')
    deg['overlapping_comparison'] = cnt
    deg['mean_rank'] = ranksum / cnt

    return deg
  })

  return { table: degTable, list: listOfGeneList }
}

export default {
  // will used in controller
  getDeTableById,
  getSubclusterDeTableById,
  getDeTypeById,
  getDeGeneByName,
  getAllDeType,
  getControlledIds,
  getComparation
}
