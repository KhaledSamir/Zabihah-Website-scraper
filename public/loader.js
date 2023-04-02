const submitBtn = document.getElementById('submitBtn');
const spinner = document.getElementById('spinner');
const growSpan = document.getElementById('growSpan')
const btnSpan = document.getElementById('btnSpan')
const cityTextBox = document.getElementById('city-textbox')
let hideLoadingButton = true;
function submit() {
    const city = cityTextBox.value;
    const radius = document
        .getElementById('radius-select')
        .value
    const businessTypeText = document
        .getElementById('business-select')
        .selectedOptions[0]
        .text;
    submitBtn.disabled = true;
    btnTextDiv.innerText = 'Loading ...'
    growSpan.hidden = false;
    console.log(businessTypeText.replace(/\s+/g, ''))
    fetch('/parse', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "searchParameters": {
                query: businessTypeText.replace(/\s+/g, ''),
                city: city,
                radius: radius
            }
        })
    }).then(data => {
        data
            .text()
            .then(value => {
                const downloadUrl = window
                    .URL
                    .createObjectURL(new Blob([value]));
                const link = document.createElement('a');
                link.href = downloadUrl;
                link.setAttribute('download', `${capitalizeFirstLetter(city)}_${radius}Mile(s)_${businessTypeText}Data.csv`);
                document
                    .body
                    .appendChild(link);
                link.click();
                submitBtn.disabled = false;
                growSpan.hidden = true;
                btnTextDiv.innerText = 'Submit';
            })

    })
}

function enableSubmitBtn() {
    if (cityTextBox.value) {
        submitBtn.disabled = false;
    } else 
        submitBtn.disabled = true;
    }

function capitalizeFirstLetter(string) {
    return string
        .charAt(0)
        .toUpperCase() + string.slice(1);
}
