public class SurveyController {
    @TestVisible private static ISurveyRepository repository;

    @AuraEnabled(Cacheable=true)
    public static SurveyDto getSurvey() {
        try {
//            // Get the survey from the database. If it doesn't exist, return null.
//            List<Survey__c> surveys = [
//                SELECT
//                    Id,
//                    Name,
//                    (
//                        SELECT Id, Name, Title__c, Description__c
//                        FROM Questions__r
//                    )
//                FROM Survey__c
//                WHERE Id = :surveyId
//            ];
//            if (surveys.size() != 1) {
//                throw new DataException(
//                    'Expected one survey for id : ' + surveyId
//                );
//            }
//            return new SurveyDto(surveys[0]);
            return repository.getSurveysWithinRange()[0];
        } catch (Exception e) {
            String errorMessage = 'Unable to retrieve the requested survey';
            AuraHandledException error = new AuraHandledException(errorMessage);
            error.setMessage(errorMessage + ' : ' + e.getMessage());
            throw error;
        }
    }

    public class DataException extends Exception { }
}
