import { type FormikProps, type FormikValues, useFormikContext } from 'formik';
import { EditableList, type EditableListProps } from '@/components/ui/EditableList.tsx';

interface EditableListWithFormikProps<T extends FormikValues> extends Omit<EditableListProps, 'items' | 'onChange'> {
  name: keyof T & string;
  formik?: FormikProps<T>;
}

export function EditableListWithFormik<T extends FormikValues>({
  name,
  formik: formikProp,
  ...props
}: EditableListWithFormikProps<T>) {
  const formikContext = useFormikContext<T>();
  const formik = formikProp || formikContext;
  
  if (!formik) {
    console.error('EditableListWithFormik must be used within a Formik context or receive formik prop');
    return null;
  }

  const { values, setFieldValue } = formik;
  const items = values[name] as string[];

  const handleChange = (newItems: string[]) => {
    setFieldValue(name, newItems);
  };

  return (
    <EditableList
      items={items}
      onChange={handleChange}
      {...props}
    />
  );
}
