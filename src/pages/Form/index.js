import { useParams } from 'react-router-dom';

import { PromotionForm } from '../../components/PromotionForm'
import { UIContainer } from '../../components/UI/Container';


const Form = () => {
  const { id } = useParams();

  return (
    <div>
      <UIContainer>
        <PromotionForm />
      </UIContainer>
    </div>
  );
};

export default Form;