public class QuestionDto {
    @AuraEnabled
    public String description { get; set; }

    @AuraEnabled
    public String title { get; set; }

    public QuestionDto(Question__c questionRecord) {
        this.description = questionRecord.Description__c;
        this.title = questionRecord.Title__c;
    }
}
