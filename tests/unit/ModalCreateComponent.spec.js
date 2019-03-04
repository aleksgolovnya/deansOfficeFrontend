import { shallowMount } from '@vue/test-utils';
import ModalCreateComponent from '@/components/ModalCreateComponent';

describe('CardComponent.vue', () => {
  it('renders props.msg when passed', () => {
    const entityInputName = 'факультета';
    const entityButtonName = 'факультет';
    const entityUrlName = 'faculties';
    const wrapper = shallowMount(ModalCreateComponent, {
      propsData: { entityInputName, entityButtonName, entityUrlName }
    });
    expect(wrapper.find('.modal-header-text').text()).toMatch('Создание факультета');
    expect(wrapper.find('.form-button').text()).toMatch('Создать факультет');
  });

  test('is a Vue instance', () => {
    const wrapper = shallowMount(ModalCreateComponent);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
