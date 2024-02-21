@IsTest
private class SurveyControllerTest {
    @IsTest
    static void getSurvey_surveyWithQuestionsConfigured_getDataBack() {
        ISurveyRepository surveyRepository = new TestSurveyRepository();

        SurveyController.repository = surveyRepository;

        SurveyDto result = SurveyController.getSurvey();

        Assert.areNotEqual(null, result);
    }

    private class TestSurveyRepository implements ISurveyRepository {
        public List<SurveyDto> getSurveysWithinRange() {
            Survey__c record = new Survey__c(
                Display_Name__c = 'Test Survey',
                Start_Date__c = Date.today()
            );

            return new List<SurveyDto> {};
        }
    }


    // TODO: get rid of if I don't want it
    private static void gettingThisOutOfHere() {
        Survey__c testSurvey = new Survey__c(
            Display_Name__c = 'Test Survey',
            Start_Date__c = Date.today()
        );
        insert testSurvey;

        Question__c testQuestion = new Question__c(
            Survey__c = testSurvey.Id
        );
        insert testQuestion;
    }

    // Getting the survey when there is a survey configured with questions for today's date -> Happy Path
    // Expect: to get the survey with the question

    // -----------------------------
    // Getting the survey when there is a survey configured with questions for outside of date range
    // Getting the survey when there is no survey configured
    // Getting survey with no questions configured
}
