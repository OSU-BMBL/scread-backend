const formidable = require('formidable')
const fs = require('fs-extra')
const sendmail = require('sendmail')()

const sendEmail = function(ctx) {
  const email = ctx.content.fields.email || ''
  const controlFile = function(ctx) {
    if (ctx.content.fields.atlasType === 'custom') {
      return ctx.content.files.controlFile.name
    } else {
      return ctx.content.fields.controlSelect
    }
  }
  const content =
    `<table class='body' style='border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;' border='0' cellspacing='0' cellpadding='0'>
  <tbody>
  <tr>
  <td style='font-family: sans-serif; font-size: 14px; vertical-align: top;'>&nbsp;</td>
  <td class='container' style='font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; margin: 0 auto; max-width: 700px; padding: 10px; width: 700px;'>
  <div class='content' style='box-sizing: border-box; display: block; margin: 0 auto; max-width: 700px; padding: 10px;'><!-- START CENTERED WHITE CONTAINER --> <span class='preheader' style='color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;'><g class='gr_ gr_65 gr-alert gr_spell gr_inline_cards gr_run_anim ContextualSpelling ins-del multiReplace' id='65' data-gr-id='65'></g></span>
  <table class='main' style='border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;'><!-- START MAIN CONTENT AREA -->
  <tbody>
  <tr>
  <td class='wrapper' style='font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;'><br />
  <table style='border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;' border='0' cellspacing='0' cellpadding='0'>
  <tbody>
  <tr>
  <td style='font-family: sans-serif; font-size: 14px; vertical-align: top;'>
  <table border='0' width='100%' cellspacing='0' cellpadding='0'>
  <tbody>
  <tr>
  <td class='subhead'>Hello,</td>
  </tr>
  <tr>
  <td class='h1' style='padding: 5px 0 0 0;'><br />
  <div>
  <div><span>You have submitted a job to scREAD and you will be notified when job is done.<br /></span><span>Your email: ` +
    email +
    `</span></div>
  </div>
  <div><span>Job information:</span></div><br/>
  <div>
  <span>Job ID: ` +
    ctx.content.jobid +
    `</span><span>&nbsp;</span> </div>
    <div>
  <div>
  <span>Disease data file: ` +
    ctx.content.files.diseaseFile.name +
    `</span><span>&nbsp;</span> </div>
    <div>
  <span>Control data file: ` +
    controlFile(ctx) +
    `</span><span>&nbsp;</span> 
  </div>
  <div>
  <span>Species: ` +
    ctx.content.fields.species +
    `</span></div>
    <div>
  <span>Gender: ` +
    ctx.content.fields.gender +
    `</span></div>
    <div>
  <span>Brain region: ` +
    ctx.content.fields.region +
    `</span></div>
    <div>
  <span>Braak stage: ` +
    ctx.content.fields.stage +
    `</span></div>
  <div>
  <span>Comments: ` +
    ctx.content.fields.comments +
    `</span>
  </div>
  </td>
  </tr>
  </tbody>
  </table>
  <p style='font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;'></p>
  <span>&nbsp;</span></td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  </tbody>
  </table>
  </td>
  </tr>
  <!-- END MAIN CONTENT AREA --></tbody>
  </table>
  <!-- START FOOTER -->
  <div class='footer' style='clear: both; margin-top: 10px; text-align: center; width: 100%;'>
  <table style='border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;' border='0' cellspacing='0' cellpadding='0'>
  <tbody>
  <tr>
  <td class='content-block' style='font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;'><span>Copyright 2020 &copy; </span><a href='http://u.osu.edu/bmbl' target='_blank' rel='noopener'>BMBL</a><span>, </span><a href='https://medicine.osu.edu/departments/biomedical-informatics/' target='_blank' rel='noopener'>OSU</a><span>. All rights reserved. </span></td>
  </tr>
  <tr>
  <td class='content-block powered-by' style='font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;'><a href='mailto:qin.ma\@osumc.edu' title='qin.ma\@osumc.edu'>Contact us: qin.ma\@osumc.edu</a><span> </span></td>
  </tr>
  </tbody>
  </table>
  </div>
   <!-- END CENTERED WHITE CONTAINER --></div>
  </td>
  <td style='font-family: sans-serif; font-size: 14px; vertical-align: top;'>&nbsp;</td>
  </tr>
  </tbody>
  </table>`
  sendmail(
    {
      from: 'scREAD <no-reply@bmbls.bmi.osumc.edu>',
      to: email,
      bcc: 'flykun0620@gmail.com, jingjiang225@gmail.com',
      subject: 'Information from scREAD',
      html: content
    },
    function(err, reply) {
      console.log(err && err.stack)
      console.dir(reply)
    }
  )
}

const moveFiles = async function(ctx) {
  const jobDir = __dirname + '/../../../upload/' + ctx.content.jobid

  if (!fs.existsSync(jobDir)) {
    fs.mkdirSync(jobDir)
  }
  // move disease file

  await fs.move(
    ctx.content.files.diseaseFile.path,
    jobDir + '/' + ctx.content.files.diseaseFile.name
  )
  console.log(
    'Successfully moved the disease file!' +
      jobDir +
      '/' +
      ctx.content.files.diseaseFile.name
  )
  // move control file
  if (typeof ctx.content.files.controlFile !== 'undefined') {
    await fs.move(
      ctx.content.files.controlFile.path,
      jobDir + '/' + ctx.content.files.controlFile.name
    )
    console.log(
      'Successfully moved the control file!' +
        jobDir +
        '/' +
        ctx.content.files.controlFile.name
    )
  }
  await fs.writeJson(jobDir + '/options.json', ctx.body)
}
const submitFiles = async function(ctx, next) {
  if ('POST' != ctx.method) return await next()
  const form = formidable({ multiples: true })
  await new Promise((resolve, reject) => {
    form.parse(ctx.req, (err, fields, files) => {
      if (err) {
        reject(err)
        return
      }
      ctx.status = 200
      const jobid = new Date().getTime()
      console.log(jobid)
      ctx.content = { fields, files, jobid }
      ctx.body = JSON.stringify(ctx.content, null, 2)
      sendEmail(ctx)
      moveFiles(ctx)
      resolve()
    })
  })
  await next()
  return
}

export default {
  submitFiles
}
