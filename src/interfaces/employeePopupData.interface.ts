export interface EmployeePopupData {
   id?: string;
   properties?: {
      firstName: {
         value: string,
         label: string,
         type: "input"
      };
      lastName: {
         value: string,
         label: string,
         type: "input"
      };
      company: {
         value: string,
         label: string,
         type: "select",
         selectData: string[]
      };
   };
}
