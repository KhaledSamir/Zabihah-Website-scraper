const submitBtn = document.getElementById('submitBtn');
const spinner = document.getElementById('spinner');
function submit() {
    const city = document
        .getElementById('city-textbox')
        .value;
    const radius = document
        .getElementById('radius-select')
        .value
    let url = `https://www.zabihah.com/search?r=${radius}&g=&l=${city}&k=&t=r`;
    submitBtn.disabled = true;
    spinner.hidden = false;
    fetch('/url', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({url: url})
    }).then(data => {

        data
            .text()
            .then(value => {
                console.log(`value is ${value}`)
                const downloadUrl = window
                    .URL
                    .createObjectURL(new Blob([value]));
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', `${capitalizeFirstLetter(city)}_${radius}_Mile(s)_data.csv`);
                document
                    .body
                    .appendChild(link);
                link.click();
                submitBtn.disabled = false;
                spinner.hidden = true;
            })

    });

    // console.log(data) data     .json()     .then(json => {         const link =
    // document.createElement('a');        // let json = JSON.stringify(data.json())
    //         blob = new Blob(json, {type: 'octet/stream'})         let downloadUrl
    // = window             .URL             .createObjectURL(blob) link.href =
    // downloadUrl         link.download = 'data.csv' link.click()   window
    //    .URL .revokeObjectURL(url)     }) .then(d => { link.href = d;
    // link.setAttribute('download', 'data.csv');     document  .body
    // .appendChild(link); link.click();     console.log(d) });

}

function capitalizeFirstLetter(string) {
    return string
        .charAt(0)
        .toUpperCase() + string.slice(1);
}