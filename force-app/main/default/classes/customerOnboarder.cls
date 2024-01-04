public with sharing class customerOnboarder {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccount(String str){
        String key = str + '%';
        return [SELECT Id,Name, Email__c, Company_ID__c,Individual_ID__c, Phone, Industry,Type, RecordTypeId FROM Account WHERE Name LIKE: key];
    }

    @AuraEnabled
    public static String recordType(String str){
        String key = str+ '%';
        if(key != '' || key != null){
        List<Account> acc = [SELECT RecordTypeId FROM Account WHERE Name LIKE:key];
        String typer;
        for(Account a: acc){
            typer = a.RecordTypeId;
            break;
        }
        return typer;
    }
        return null;
    }
    

    @AuraEnabled(cacheable = true)
    public static List<Contact> getContact(String str){
        String key = str+ '%';
        return [SELECT Id,Account.Name, FirstNAme, LastName, Company_ID__c, Individual_ID__c, Email, MobilePhone FROM Contact WHERE Account.Name LIKE: key];
    }
    
}