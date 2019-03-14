import  tools  from '/src/tools.js'
import Form from '/src/components/form.js'

let modal = document.getElementById('modal');

const createState = (state) => {
    return new Proxy(state, {
        set(target, property, value) {
            target[property] = value;
            render();
            return true;
        }
    });
};

const state = createState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    qty: '',
    starting_loc: '',
    additionalRiders: [
        {name: '', email: ''},
        {name: '', email: ''},
        {name: '', email: ''},
        {name: '', email: ''}
    ],
    action: '',
    data: '',
    registration: '',
    page: 0,
    totalDue: ''
    
});

const render = () => {
        
    let prevButton = document.getElementById('prev_button')
    let nextButton = document.getElementById('next_button')
    let pages = document.getElementById('registration').querySelectorAll('.tab')
    let additionalRiders = document.querySelectorAll('.add_rider')
    let submit = document.getElementById('submit')
    let head = document.querySelectorAll('.head');
    
    const bindings = Array.from(document.querySelectorAll('[data-binding]'))
    .map(e => e.dataset.binding);
    
    bindings.forEach((binding) => {
        if (binding === 'page'){
            let page = state[binding];

            switch(page){
                case 0:
                    tools.hidePages(pages, head, submit)
                    pages[0].style.display = 'block';
                    prevButton.style.display = 'none';
                    pages[0].style.display = 'block';
                    head[0].style.display = "block"
                    break;
                case 1:
                    tools.hidePages(pages, head, submit)
                    pages[1].style.display = 'block';
                    prevButton.style.display = 'block';
                    head[1].style.display="block"
                    break;
                case 2: 
                    tools.hidePages(pages, head, submit);
                    pages[2].style.display = 'block';
                    prevButton.style.display = 'block';
                    head[1].style.display="block"
                    nextButton.style.display="block"
                    break;
                case 3:
                    tools.hidePages(pages, head, submit);
                    pages[3].style.display = 'block';
                    prevButton.style.display = 'block';
                    head[2].style.display= "block";
                    nextButton.style.display = 'none';
                    submit.style.display = 'block'
                    break;
                case 4:
                    tools.hidePages(pages, head, submit);
                    pages[4].style.display = 'block';
                    nextButton.style.display = 'none';
                    prevButton.style.display = 'none'
                default:
            }
          
        } else if (binding.includes("additionalRiders")) {
                    if (state[binding] == undefined){
                        document.querySelector(`[data-binding='${binding}']`).innerHTML = '';
                        document.querySelector(`[data-model='${binding}']`).value = '';
                    } else {
                        document.querySelector(`[data-binding='${binding}']`).innerHTML = state[binding];
                        document.querySelector(`[data-model='${binding}']`).value = state[binding];
                    }
        } else if (binding === 'qty') {
            let qty = state[binding]
            let aR = additionalRiders;
            
            tools.hideAddRiders(qty, aR)
            document.querySelector(`[data-binding='${binding}']`).innerHTML = state[binding];
            document.querySelector(`[data-model='${binding}']`).value = state[binding];
            
            let sliderButtonDest = document.getElementById('slider-toggle');
            sliderButtonDest.innerHTML = Form.createSliderButtons(qty);
        
        } else {
            document.querySelector(`[data-binding='${binding}']`).innerHTML = state[binding];
            document.querySelector(`[data-model='${binding}']`).value = state[binding];
        }
    });
};

/* buttons, dropdowns etc */
const buttons = document.querySelectorAll('button');

const getModal = (data) => {
    $(modal).modal({
        dimmerSettings:{
            opacity: .1,
        }
    }).modal('show').modal({dimmerSettings:{closable: false}})
}

/* formstack helpers */

const getDataFields = () => {
    let url = `https://pl-admin-api-v3-coreyjsax.c9users.io/tourdeluce/form/3002951`;
	return fetch(url)
	.then((res) => res.json())
	.catch((err) => err)
}

const getData = () => {
    tools.getDataFields()
    .then((data) => {
        
        makeForm(data)
        state.data = data;
        console.log(data)
        const listeners = document.querySelectorAll('[data-model]');
      //  let prevButton = document.getElementById('prev_button');
       // let nextButton = document.getElementById('next_button');
       // const buttons = document.querySelectorAll('.button');

        for (let i = 0; i < listeners.length; i++){

            const name = listeners[i].dataset.model;

            if (listeners[i].type == "text"){
                listeners[i].addEventListener('keyup', (event) => {
                    state[name] = listeners[i].value;
                    console.log(state);
                });
            }  else if (listeners[i].type === "select-one"){
                
                let select = listeners[i]
                
                select.addEventListener('change', (event) => {
                    state[name] = select.value;
                    if (select.getAttribute('id') == 'qty'){
                       console.log(state.qty)
                       Form.totalDue(state.qty)
                    }
                })
            }  else if (listeners[i].dataset.model == "page") {
                let pageButtons = listeners[i];
                pageButtons.addEventListener('click', (event) => {
                    let target = event.target;
                    let action = target.dataset.action;
                    if (action === 'next'){
                        state[name] += 1;
                    } else if (action === 'prev'){
                        state[name] += -1;
                    } else if (action === 'submit'){
                        state[name] += 1;
                        tools.processOrder();
                        
                    }
                })
            }
        }

       buttons.forEach((button) => {
            const action = button.dataset.action;
            button.addEventListener('click', (event) => {
                if (action === 'modal'){
                    getModal()
                } /* else if (action === 'next'){
                    state[page] += 1;
                    console.log(state)
                } */
            })
        }) 

    })
}
/* tools */
const getArrayFromNum = (end, start) => {
    return Array(parseInt(end) - start + 1).fill().map((_, idx) => start + idx);
}

/* build form */
const makeForm = (formFields) => {
    let fields = formFields.fields;
    
    let formData = new function(){
        let self = this;
        this.tickets = fields[1],
        this.ticketQtySel = getArrayFromNum(5, 1),
        this.name = formFields.fields[3], 
        this.email = formFields.fields[4],
        this.phone = formFields.fields[5],
        this.starting_loc = formFields.fields.filter(field => {
            return field.name == 'individual_rider_starting_location'
        }),
        this.process = {
            search: function(fields, param){
                return fields.filter(field => field.name.includes(param));
            }
        },
        this.additionalRiders = {
            rider2: self.process.search(fields, 'rider_2'),
            rider3: self.process.search(fields, 'rider_3'),
            rider4: self.process.search(fields, 'rider_4'),
            rider5: self.process.search(fields, 'rider_5')
        },
        this.addRiders = [
            {rider: "rider_2", data: self.additionalRiders.rider2}, 
			{rider: 'rider_3', data: self.additionalRiders.rider3},
			{rider: 'rider_4', data: self.additionalRiders.rider4},
			{rider: 'rider_5', data: self.additionalRiders.rider5},  
        ],
        this.paymentPage = {
            credit_card: self.process.search(fields, 'credit_card'),
            ccv: self.process.search(fields, 'card_verification_code'),
            expiration: self.process.search(fields, 'expiration_date'),
            billing_name: self.process.search(fields, 'billing_name'),
            billing_phone: self.process.search(fields, 'billing_phone'),
            billing_email: self.process.search(fields, 'billing_email')
        },
        this.totalDue = {
            
        }
    }();
    
    const headerContent = (pg) => {
        console.log(pg)
        if (pg === 0){
            return /*html*/ `
                <h4 class="">$25 Tour de Lucé Registration</h4>
            `;
        } else {
            return /*html*/ `
            <div class="">
            <label>Tickets</label>
            <select id="qty" data-model="qty" type="select">
                <option value="">select qty</option>
                ${formData.ticketQtySel.map(q => /*html*/ `
                    <option value="${q}" data-index="${q-2}">${q}</option>
                `).join('')}
            </select>
        </div>
            `;
        }
    }
    
    const form = () => {
        
        let f = formData
        return /*html*/ ` 
        <div class="frame">
        <style scoped></style>
        <form id="registration" class="ui form">
            <div class="form-header">
                
                <div id="pg-head" class="pg head">
                    $25 Tour de Lucé Registration
                </div>
                <div id="pg1-head" class="pg-1 head">
                    ${headerContent(state.pg)}
                </div>
                <div id="pg2-head" class="pg-2 head">
                    Payment
                </div>
                <div id="pg-thanks-head" class="pg-3 head">
                    Thank You!
                </div>
            </div>
            
            <div id="ticket-tab" class="tickets tab hide">
            <h4 class="ui class dividing header">Registration</h4>
                ${Form.descField(f.tickets)}
               
            </div>
            <div id="reg-tab" class="registration tab hide">
    
                    <div class="two fields">
                        ${Form.textInput(f.name, 'first name', 'firstName')}
                        ${Form.textInput(f.name, 'last name', 'lastName')}
                    </div>
                
                    <div class="two fields">
                        ${Form.textInput(f.email, 'email', 'email')}
                        ${Form.textInput(f.phone, 'phone', 'phone')}
                    </div>
                        ${Form.select(f.starting_loc, 'Choose starting location', 'starting_loc')}
                
            </div>
            <div id="" class="additional_riders tab hide">
                
                <h4>Additional Riders Tab</h4>
                <div class="slider">
                    ${Form.otherRiders(f.addRiders, state.qty)}
                </div>
                <div id="slider-toggle">
                </div>
                
            </div>
            <div id="payment-inputs" class="payment tab hide">
                ${Form.paymentPage(f.paymentPage, state.qty)}
            </div>
            <div class="thanks tab hide">
                thank you
            </div>
            <div id="form-footer" class="form-footer">
                ${Form.footerButtons()}
            </div>

        </form>
        </div>
    `
    };
   console.log(state)
    modal.querySelector('.body').innerHTML = form(Form);
    
}

getData();

