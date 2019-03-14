const form = {
    textInput: function(data, placeholder, dataModel){
        return /*html*/`
            <div class="field">
                <label>${data.label}</label>
                <input type="text" name="${dataModel}" placeholder="${placeholder}" data-fsId="${data.id}" data-model=${dataModel} >
            </div>
        `
    },
    select: function(data, placeholder, dataModel){
        return /*html*/`
            ${data.map(input => 
   /*html*/ `<div class="field location" data-fsId="${input.id}" >
                <label>${input.label}</label>
                <select id="starting-loc" class="ui search selection dropdown" data-model="${dataModel}" type="select">
                    <option value="">${placeholder}</option>		
                ${input.options.map(option => 
                    /*html*/`<option value="${option.label}">${option.label}</option>`
                ).join('')}
                </select>
            </div>`
            ).join('')}
        `
    },
    otherRiders: function(data, qty){
        console.log(qty)
        return /*html*/`
            <div class="slides">
            ${data.map((rider, index) => 
    /*html*/`<div data-index=${index} class="add_rider slide hide" id="slide-${index+1}">
                    ${rider.data.map(input => 
            /*html*/`<div class="field rider" data-fsId="${input.id}">
                            <label>${input.label}</label>
                            <input name="${input.name}" type="text" placeholder="${input.label}" data-model="additionalRiders[${index}].${input.type}">
                        </div>`
                    ).join('')}
                </div>`
            ).join('')}
            </div>
        `
    },
    paymentPage: function(data, totalDue){
        console.log(totalDue)
        console.log(data)
        console.log('page')
        return /*html*/`
        <h4 class="ui dividing header">Payment page</h4>
        <div class="fields">
            <div class="seven wide field">
            <label>Card Number</label>
            <input type="text" name="card[number]" maxlength="16" placeholder="Card" data-fsId="${data.credit_card[0].id}">
            </div>
            <div class="three wide field">
            <label>CVC</label>
            <input type="text" name="card[cvc]" maxlength="3" placeholder="CVC" data-fsId="${data.ccv[0].id}">
            </div>
            <div class="six wide field">
            <label>Expiration</label>
            <div class="two fields">
                <div class="field">
                <select class="ui fluid search dropdown" name="card[expire-month]" data-fsId="${data.expiration[0].id}">
                    <option value="">Month</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
                </div>
                <div class="field">
                <input type="text" name="card[expire-year]" maxlength="4" placeholder="Year" data-fsId=${data.expiration[0].id}>
                </div>
            </div>
            </div>
        </div>
        <div class="two equal width fields">
            <div class="field">
                <label>billing first name</label>
                <input type="text" name="billing_first_Name" placeholder="billing first name" data-fsId=${data.billing_name[0].id}>
            </div>
            <div class="field">
            <label>billing last name</label>
                <input type="text" name="billing_first_Name" placeholder="billing last name" data-fsId=${data.billing_name[0].id}>
            </div>
        </div>
        <div class="two equal width fields">
            <div class="field">
                <label>billing phone</label>
                <input type="text" name="billing_phone" placeholder="billing phone" data-fsId=${data.billing_phone[0].id}>
            </div>
            <div class="field">
            <label>billing email</label>
                <input type="text" name="billing_email" placeholder="billing email" data-fsId=${data.billing_email[0].id}>
            </div>
            <div id="total-due-section" class="total-due">
                <h4>Total Due ${totalDue * 25}</h4>
            </div>
        </div>
        `
    },
    totalDue: function(total){
        let destination = document.getElementById('total-due-section');
        
        destination.innerHTML = /*html*/`
            <h4>Total Due ${total * 25}</h4>
        `
    }
}

export default form;