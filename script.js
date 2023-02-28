async function main() {
  // Uses the Replit Extensions `fs` API to grab the list of files 
  // in your root folder, and writes it to the document.
  const { children } = await replit.fs.readDir('.');
  document.write(children.map(c => c.filename).join(', '));
}

main();