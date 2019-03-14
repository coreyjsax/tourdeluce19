
const tools = {
    getDataFields: () => {
        let url = `https://pl-admin-api-v3-coreyjsax.c9users.io/tourdeluce/form/3002951`;
        return fetch(url)
        .then((res) => res.json())
        .catch((err) => err)
    },
    hidePages: (pages, head) => {

        submit.style.display = 'none'

        Array.from(pages).map(p => p.style.display = 'none');
        Array.from(head).map(h => h.style.display = 'none');

    },
    hideAddRiders: (qty, additionalRiders, ) => {
        let aR = additionalRiders;

        Array.from(aR).map(r => r.style.display = 'none');

        for (let i = 0; i < (qty - 1); i++){
            aR[i].style.display = "block";
        }
    },
    processOrder: function(){

        let form = document.getElementById('registration');
        let textInputs = form.querySelectorAll('input');
        let selectInputs = form.querySelectorAll('select');

        let textObj = Array.from(textInputs).map(input => {
            
            let obj = {
                name: input.name, 
                value: input.value, 
                fSid: input.getAttribute('data-fsid')
            }
            return obj;
        });

        let selectObj = Array.from(selectInputs).map(input => {
            
            let obj = {
                name: input.name,
                value: input.value,
                fSid: input.getAttribute('data-fsid')
            }
            return obj;
        });

        let formData = textObj.concat(selectObj);
        let newData = this.arrayToObject(formData, "name"); 
        console.log(newData)
    },
    arrayToObject: function(array, keyField){
        let data = array.reduce((obj, item) => {
            obj[item[keyField]] = item
            return obj
        }, {})
        return data
    },
    submitOrder: function(orderData, formId){
        const url = `https://pl-admin-api-v3-coreyjsax.c9users.io/tourdeluce/form/${formId}`

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(orderData),
            headers:{ 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(response => alert('Success:', JSON.stringify(response)))
        .catch(err => console.log('Error:', err));
    }
}

export default tools;

