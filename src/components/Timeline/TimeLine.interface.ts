export interface ITimeLineItem {
  dateFrom: string
  dateTo?: string
  title: string
  description?: string
  position: string
}

export interface ITimeLine {
  list: ITimeLineItem[]
}
