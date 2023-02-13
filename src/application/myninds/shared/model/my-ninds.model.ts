/* eslint-disable */

export class MyNINDSActions {
  id: string;
  applicationId: string;
  application: string;
  details: string;
  actionUrl: string;
  action: string;
  assignedTo: string;
  assginedOn: Date;
  dueDate: Date;
  assginedBy: string;
  active: boolean;

  constructor(request: any) {
    this.id = request?.Id;
    this.application = request?.Application;
    this.applicationId = request?.ApplicationId;
    this.details = request?.Details;
    this.actionUrl = request?.ActionUrl;
    this.action = request?.Action;
    this.assginedOn = request?.Created ? new Date(request?.Created) : null;
    this.assginedBy = request?.CreatedBy;
    this.assignedTo = request?.request;
    this.dueDate = request?.DueDate ? new Date(request?.DueDate) : null;
    this.active = request?.Active;
  }
}
