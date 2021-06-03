import { useParams } from 'react-router-dom';


const Form = () => {
  const { id } = useParams();

  return (
    <div>
      FORM
      {id && <div>id: { id }</div>}
    </div>
  );
};

export default Form;