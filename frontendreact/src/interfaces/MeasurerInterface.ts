interface MeasurerInterface {   
  created_at: string,
  id: number,
  name: string,
  updated_at: string,
  isPersonal: boolean,
  fr: string,
  real: string,
  imaginary: string,
  modulus: string,
  phase: string,
  delimiter: string,
  fromLine: number,
}

export default MeasurerInterface;