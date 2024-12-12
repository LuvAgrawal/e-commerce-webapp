export function discountCalculator(mrp, sale) {
  const disPercent = Math.round(((mrp - sale) / mrp) * 100);
  return disPercent;
}
// discountCalculator(12000, 9000)

export function paginationHelper(data, itemsPerPage) {
  // console.log("Running...")

  var requiredPages = null;
  let dataLength = data.length;
  requiredPages = dataLength / itemsPerPage;
  requiredPages = Math.ceil(requiredPages);

  console.log("Required Pages:-", requiredPages);

  let pageLength = new Array();

  for (let i = 1; i < requiredPages + 1; i++) {
    pageLength = [...pageLength, i];
  }
  console.log(pageLength);
  return pageLength;
}

// .slice((page * itemsPerPage) - itemsPerPage, page * itemsPerPage)

// paginationHelper([52, 53, 54, 664], 2);
// Data should be passed as AN ARRAY OR AN OBJECT
