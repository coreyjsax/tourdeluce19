
const tools = {
    getDataFields: () => {
        let url = `https://pl-admin-api-v3-coreyjsax.c9users.io/tourdeluce/form/3002951`;
        return fetch(url)
        .then((res) => res.json())
        .catch((err) => err)
    },
    getArrayFromNum: (end, start) => {
        return Array(parseInt(end) - start + 1).fill().map((_, idx) => start + idx);
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
            let dynamicField = `field_${input.getAttribute('data-fsid')}`;
            let obj = {
               /* name: input.name, 
                value: input.value, 
                fSid: input.getAttribute('data-fsid'), */
                value: input.value,
                name: input.name,
                [dynamicField]: input.value,
                fsid: input.getAttribute('data-fsid')

            }
            return obj;
        });

        let selectObj = Array.from(selectInputs).map(input => {
            let dynamicField = `field_${input.getAttribute('data-fsid')}`;
            let fieldId = input.getAttribute('data-fsid');
            let obj = {
                name: input.name,
                value: input.value,
                fsid: input.getAttribute('data-fsid'),
                [dynamicField]: input.value
            }
            return obj;
        });

        let formData = textObj.concat(selectObj);
        console.log(formData)
        let newData = this.arrayToObject(formData, "name"); 
        
        this.submitOrder(formData, '123')
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
        .then(response => console.log(response))
        .catch(err => console.log('Error:', err));
    }
}

export default tools;

