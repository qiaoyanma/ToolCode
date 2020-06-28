(function generatePdf() {
    const doc = new jsPDF();
    doc.text("Hello semlinker!", 66, 88);
    const blob = new Blob([doc.output()], { type: "application/pdf" });
    blob.text().then((blobAsText) => {
      console.log(blobAsText);
    });
  })();

  function test(){
    let imgData = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/...'
    let doc = new jsPDF();
    
    doc.setFontSize(40)
    doc.text(35, 25, 'Paranyan loves jsPDF')
    doc.addImage(imgData, 'JPEG', 15, 40, 180, 160)
  }