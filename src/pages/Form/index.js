import { useParams } from 'react-router-dom';

import { PromotionForm } from '../../components/PromotionForm'
import { UIContainer } from '../../components/UI/Container';


const Form = () => {
  const { id } = useParams();

  return (
    <div>
      <UIContainer>
        <PromotionForm id={id ? Number.parseInt(id, 10) : null}/>
      </UIContainer>
    </div>
  );
};

export default Form;