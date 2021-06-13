import * as yup from 'yup';


export default yup.object().shape({
  title: yup.string().required('Campo obrigatório'),
  url: yup.string().url('url deve ser um URL válido').required('Campo obrigatório'),
  imageUrl: yup.string().url('url deve ser um URL válido').required('Campo obrigatório'),
  price: yup.number().required('Campo obrigatório'),
});