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

const getDeTableById = async (id, other) => {
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

const getSubclusterDeTableById = async (id, other) => {
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

const getDeTypeById = async (id) => {
  const result = await deMeta.findAll({
    where: {
      [Op.or]: [{ data_id: id }, { b_data_id: id }]
    }
  })
  return result
}

const getAllDeType = async (id) => {
  const result = await deMeta.findAll()
  return result
}

const getDeGeneByName = async (id) => {
  const result = await de.findAndCountAll({
    where: {
      gene: id
    }
  })
  return result
}

const getControlledIds = async (id) => {
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

const getOverlapDeg = async (ctShortName,
  ctLongName,
  diseaseId,
  top,
  direction) => {
  const ctrlIds = await getControlledIds(diseaseId)
  const attrs = [
    'cluster',
    'gene',
    'avg_logFC',
    'p_val_adj',
    'pct_1',
    'pct_2',
    'a_data_id',
    'b_data_id'
  ]
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
    order: [['p_val_adj', 'ASC']],
    limit: top,
    attributes: attrs
  })
  // get only attrs in the object and give them a 'rank' by order
  result = result.map((curr, index) => {
    let ret = {}
    for (const key of attrs) {
      ret[key] = curr[key]
    }
    ret['disease_id'] = ret['a_data_id']
    ret['control_id'] = ret['b_data_id']
    delete ret['b_data_id']
    delete ret['a_data_id']
    ret['rank'] = index + 1
    return ret
  })
  return result
}

const getOverlap = async (region, species, top, threshold, direction) => {
  const cellTypeMap = await cellType.getCellTypeList()
  const diseaseIds = await dataSet.getDataIds(region, species, 'Disease')
  // get the intersection of genes of the diseases by threshold
  const idxs = [...Array(diseaseIds.length).keys()]
  const diseaseCombn = combinations(idxs, threshold)
  // console.log(diseaseIds)
  let listOfGeneList = {}
  let degTable = []
  for (const [ctShortName, ctLongName] of Object.entries(cellTypeMap)) {
    let ctDegTable = []
    let ctGeneList = []
    for (const diseaseId of diseaseIds) {
      const result = await getOverlapDeg(
        ctShortName,
        ctLongName,
        diseaseId,
        top,
        direction
      )
      const genes = result.map((r) => r.gene)
      ctGeneList.push(genes)
      ctDegTable = ctDegTable.concat(result)
      //}
    }
    const combGenes = diseaseCombn.map((comb) => {
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

  const gene_ct_map = {}
  Object.entries(listOfGeneList).reduce((map, [ct, genes]) => {

    genes.reduce((map1, gene) => {
      if (gene in map1) {
        map1[gene].push(ct)
      } else {
        map1[gene] = [ct]
      }
      return map1
    }, map)
    return map
  }, gene_ct_map)
  // count the ct-gene pairs, and sum up the rank for avg
  const ct_gene = new Map()
  degTable.reduce((map, ct_g) => {
    const mKey = [ct_g.cluster, ct_g.gene].join('_')
    if (map.has(mKey)) {
      let cg = map.get(mKey)
      cg.set('cnt', cg.get('cnt') + 1)
      cg.set('rank', cg.get('rank') + ct_g.rank)
    } else {
      let tmp = new Map()
      tmp.set('cnt', 1)
      tmp.set('rank', ct_g.rank)
      map.set(mKey, tmp)
    }
    return map
  }, ct_gene)
  degTable.map((deg) => {
    const mKey = [deg.cluster, deg.gene].join('_')
    let cnt = ct_gene.get(mKey).get('cnt')
    let ranksum = ct_gene.get(mKey).get('rank')
    deg['overlapping_comparison'] = cnt
    deg['mean_rank'] = ranksum / cnt

    return deg
  })

  return { table: degTable, map: gene_ct_map }
}

export default {
  // will used in controller
  getDeTableById,
  getSubclusterDeTableById,
  getDeTypeById,
  getDeGeneByName,
  getAllDeType,
  getControlledIds,
  getOverlap
}
