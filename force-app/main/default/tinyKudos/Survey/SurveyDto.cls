public class SurveyDto {
    @AuraEnabled
    public Id recordId { get; set; }
    @AuraEnabled
    public String title { get { return this.questions[0].title; } }
    @AuraEnabled
    public List<QuestionDto> questions { get; set; }

    public SurveyDto(Survey__c surveyRecord) {
        this.recordId = surveyRecord.Id;

        this.questions = new List<QuestionDto>();
        if (!surveyRecord.Questions__r.isEmpty()) {
            for (Question__c question : surveyRecord.Questions__r) {
                this.questions.add(new QuestionDto(question));
            }
        }
    }
}
