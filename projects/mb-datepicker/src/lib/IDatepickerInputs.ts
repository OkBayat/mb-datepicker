export type AliasDate = Date | number | string;

interface IApi {
    close?(): void;
    Date?: any;
    open?(): void;
    selectDate?(date: Date): void;
}

export interface IDatepickerInputs {
    api: IApi;
    date: AliasDate;
    largerThan: AliasDate;
    periodHover: Date;
    placeholder?: string;
    smallerThan: AliasDate;
}
