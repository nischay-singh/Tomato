function displayFileNames() {
  const images = document.getElementById("image");
  const nameDivs = document.getElementsByClassName("displayFileNames");
  for (let nameDiv of nameDivs) {
    if (images.files.length > 0) {
      nameDiv.innerHTML = "<h6 class='mt-2'>Uploaded Images:</h6>";
      nameDiv.innerHTML += "<ul>";
      for (let i = 0; i < images.files.length; i++) {
        let fname = images.files.item(i).name;
        nameDiv.innerHTML += `<li>${fname}</li>`;
      }
      nameDiv.innerHTML += "</ul>";
    }
  }
}
