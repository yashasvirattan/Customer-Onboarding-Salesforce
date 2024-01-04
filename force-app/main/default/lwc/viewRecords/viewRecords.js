import { LightningElement, track, wire } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import getAccount from '@salesforce/apex/customerOnboarder.getAccount';
import getContact from '@salesforce/apex/customerOnboarder.getContact';
import recordType from '@salesforce/apex/customerOnboarder.recordType';
export default class ViewRecords extends LightningElement {

    searchKey;
    key;

    accounts;
    contacts;

    recordtyper;
    recordtyperb;
    
    
    handleChange(event){
        console.log('in handleEvent');
        this.searchKey = event.target.value;
    }

    handleClick(){
        if(this.searchKey == null || this.searchKey == ''){
            console.log('empty search key!');
            const evt = new ShowToastEvent({
                title: 'Input Error',
                message: 'Please enter the correct Account Name!',
                variant: 'error',
                mode: 'dismissable'
            });
            this.dispatchEvent(evt);
        }
        else{
        console.log('in Click');
        getAccount({str : this.searchKey})
        .then((result) =>{
            this.accounts = result;
            this.error = undefined;
        })
        .catch((error) =>{
            this.error = error;
            this.accounts = undefined;
        });

        getContact({str : this.searchKey})
        .then((result) =>{
            this.contacts = result;
            this.error = undefined;
        })
        .catch((error) =>{
            this.error = error;
            this.contacts = undefined;
        });
        this.key = this.searchKey;
        if(this.accounts.length == 0){
            console.log('Null value in Account.');
            const evt = new ShowToastEvent({
                title: 'Input Error',
                message: 'Please enter the correct Account Name!',
                variant: 'error',
                mode: 'dismissable'
            });
            this.dispatchEvent(evt);
        }
    }
    }

    get handleType(){

        recordType({str : this.key})
        .then((result) =>{
            this.recordtyper = result;
            this.error = undefined;
        })
        .catch((error) =>{
            this.error = error;
            this.recordtyper = undefined;
        });
        console.log(this.recordtyper);

        if(this.recordtyper == '0122t000000bxooAAA'){
            return true;
        }
        else{
            return false;
        }
        
    }

    // handleMessage(){
    //     const evt = new ShowToastEvent({
    //         title: 'Input Error',
    //         message: 'Please enter the correct Account Name!',
    //         variant: 'error',
    //         mode: 'dismissable'
    //     });
    //     this.dispatchEvent(evt);
    // }

}