public class SurveyController {
    @TestVisible private static ISurveyRepository repository;

    @AuraEnabled(Cacheable=true)
    public static SurveyDto getSurvey() {
        try {
            // Get the survey from the database. If it doesn't exist, return null.
            List<Survey__c> surveys = [
                SELECT
                    Id,
                    Name,
                    (
                        SELECT Id, Name, Title__c, Description__c
                        FROM Questions__r
                    ),
                    (
                        SELECT Available_Until__c
                        FROM Survey_Instances__r
                        WHERE Available_Until__c >= :Date.today()
                    )
                FROM Survey__c
            ];
            if (surveys.isEmpty()) {
                throw new DataException(
                    'No surveys found'
                );
            }
            for (Survey__c survey : surveys) {
                if (survey.Survey_Instances__r.isEmpty()) {
                    throw new DataException(
                        'No available survey instances found'
                    );
                }
            }
            return new SurveyDto(surveys[0]);
        } catch (Exception e) {
            String errorMessage = 'Unable to retrieve the requested survey';
            AuraHandledException error = new AuraHandledException(errorMessage);
            error.setMessage(errorMessage + ' : ' + e.getMessage());
            throw error;
        }
    }

    public class DataException extends Exception { }
}
