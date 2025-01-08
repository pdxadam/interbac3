export default class School{
    name = "Riverdale High School"
    programs = [];
    teachers = [];
    
     terms = 3;
     periods = 5;
    constructor(name, terms = 3, periods = 5){
        this.name = name;
        this.setTerms(terms);
        this.periods = periods;
    }
    setTerms(terms){
        if (terms > 0){
            this.terms = terms;
        }
    }
    getTerms(){
        return this.terms;
    }
    setPeriods(periods){
        if (periods > 0){
            this.periods = periods
        }
    }
    getPeriods(){
        return this.periods;
    }
}