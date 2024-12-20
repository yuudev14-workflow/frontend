interface Query {
  name: string;
  configuration: Configuration;
  operations: Operation[];
}

interface Configuration {
  fields: Field[];
}

interface Field {
  title: string;
  description: string;
  type: 'text' | 'password' | 'checkbox'; 
  name: string;
  required: boolean;
  editable: boolean;
  visible: boolean;
  value?: string; 
  tooltip?: string; 
}

interface Operation {
  operation: string;
  title: string;
  description: string;
  annotation: string;
  enabled: boolean;
  parameters: Parameter[];
}

interface Parameter {
  title: string;
  description: string;
  required: boolean;
  editable: boolean;
  visible: boolean;
  type: 'text' | 'number' | 'boolean'; 
  tooltip?: string; 
  name?: string; 
  placeholder?: string;
}
