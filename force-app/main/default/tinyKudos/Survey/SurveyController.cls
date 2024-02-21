public class SurveyController {
    @AuraEnabled(cacheable=true)
    public static SurveyDto getSurvey(String surveyId) {
        try {
            // Get the survey from the database. If it doesn't exist, return null.
            List<Survey__c> surveys = [
                SELECT
                    Id,
                    Name,
                    (
                        SELECT Id, Name, Title__c, Description__c
                        FROM Questions__r
                    )
                FROM Survey__c
                WHERE Id = :surveyId
            ];
            if (surveys.size() != 1) {
                throw new DataException(
                    'Expected one survey for id : ' + surveyId
                );
            }
            return new SurveyDto(surveys[0]);
        } catch (Exception e) {
            String errorMessage = 'Unable to retrieve the requested survey';
            AuraHandledException error = new AuraHandledException(errorMessage);
            error.setMessage(errorMessage + ' : ' + e.getMessage());
            throw error;
        }
    }

    public class SurveyDto {
        @AuraEnabled
        public Id recordId { get; set; }

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

    public class DataException extends Exception {
    }
}
