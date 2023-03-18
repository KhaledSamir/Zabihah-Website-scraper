function submit() {
    const city = document
        .getElementById('city-textbox')
        .value
    const radius = document
        .getElementById('radius-select')
        .value
    let url = `https://www.zabihah.com/search?r=${radius}&g=&l=${city}&k=&t=r`;
    fetch('/url', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({url: url})
    })
}