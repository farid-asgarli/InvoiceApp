export interface InvocieSearchParams{
    startDate?:Date;
    endDate?:Date;
    searchString?:string;
    byProject?:boolean;
    byClient?:boolean;
}

export class InvoiceSearchParams{
    startDate?:Date= new Date('2021-1-1');
    endDate?:Date=new Date('2021-12-1');
    searchString?:string;
    byProject?:boolean;
    byClient?:boolean;

    constructor(values?:InvoiceSearchParams)
    {
        if(values){
            this.startDate= values.startDate;
            this.endDate= values.endDate;
            this.searchString= values.searchString;
            this.byClient= values.byClient;
            this.byProject= values.byProject;
        }
    }
}