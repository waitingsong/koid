
export interface testArr {
  time: number
  dataCenter: number
  worker: number
  idStr: string
}

export const config1: testArr[] = [
  {
    time: 0x8c20543b0, dataCenter: 0, worker: 0, idStr: '0x02308150ec000000',
  },
]

export const config4: testArr[] = [
  {
    time: 0x8c20543b1, dataCenter: 0, worker: 0, idStr: '0x02308150ec400000',
  },
  {
    time: 0x8c20543b1, dataCenter: 0, worker: 0, idStr: '0x02308150ec400001',
  },
  {
    time: 0x8c20543b1, dataCenter: 0, worker: 0, idStr: '0x02308150ec400002',
  },
  {
    time: 0x8c20543b1, dataCenter: 0, worker: 0, idStr: '0x02308150ec400003',
  },
]

export const config2: testArr[] = [
  {
    time: 0x8c20c0335, dataCenter: 0b00011, worker: 0b00001, idStr: '0x02308300cd461000',
  },
  {
    time: 0x8c20c0335, dataCenter: 0b00011, worker: 0b00001, idStr: '0x02308300cd461001',
  },
]

