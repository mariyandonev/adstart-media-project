import { CustomForm } from '../components'
import { FormProvider } from '../context/FormContext';

const FormPage = () => {
    return (
        <>
            <div className='text-center'>
                <h2 className='font-bold text-3xl mb-3'>Get a project quote</h2>
                <p className='mb-9'>Please fill the form below to receive a quote for your project. Feel free to add as much detail as needed.</p>
            </div>
            <FormProvider>
                <CustomForm />
            </FormProvider>
        </>
    )
}

export default FormPage;