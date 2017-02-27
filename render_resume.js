const marked = require('marked')
const fs = require('fs')
const Handlebars = require('handlebars')

marked.setOptions({
  renderer: new marked.Renderer(),
})

// Using synchronous file processing because it makes my code easier to read with fewer dependencies.
// Also this is just a simple make file in node.js pretty much :P

const encoding = {encoding: 'utf-8'}
// Import README.md and process into html
const raw_markdown = fs.readFileSync('./README.md', encoding)
const resume_html = marked(raw_markdown)
// read resume template html
const resume_template = fs.readFileSync('./template.html', encoding)
// Insert style tag css
const css = fs.readFileSync('./github-resume.css', encoding)
const context = {
  styles: css,
  title: 'Kwyn Alice Meagher',
  body: resume_html
}
// Render template
const template = Handlebars.compile(resume_template)
const resume = template(context)
// Save to index.html
fs.writeFileSync('./index.html', resume)
