
const tools = {
    test: function(value){alert(value)},
    processOrder: function(){
        let form = document.getElementById('registration');
        let textInputs = form.querySelectorAll('input');
        let selectInputs = form.querySelectorAll('select')
        console.log(selectInputs)

        let processInputs = (inputs) => {
            
        }
        
        let textObj = Array.from(textInputs).map(input => {
            let obj = {value: input.value, fSid: input.getAttribute('data-fsid')}
            return obj;
        })

        let selectObj = Array.from(selectInputs).map(input => {
            let obj = {value: input.value, fSid: input.getAttribute('data-fsid')}
            return obj;
        })
        console.log(textObj)
        console.log(selectObj)
        
    },
    submitOrder: function(orderData, formId){
        const url = `https://pl-admin-api-v3-coreyjsax.c9users.io/tourdeluce/form/${formId}`

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(orderData),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(response => alert('Success:', JSON.stringify(response)))
        .catch(err => console.log.err('Error:', err));
    }
}

export default tools;

