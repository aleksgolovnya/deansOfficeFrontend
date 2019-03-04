import { shallowMount } from '@vue/test-utils';
import CardComponent from '@/components/CardComponent.vue';

describe('CardComponent.vue', () => {
  it('renders props.msg when passed', () => {
    const entitiesList = [{name: 'faculty name', description: 'faculty description'}];
    const entityUrlName = 'faculties';
    const wrapper = shallowMount(CardComponent, {
      propsData: { entitiesList, entityUrlName },
      mocks: {
          $store: {
              getters: {
                  isAdmin: true
              }
          }
      }
    });
    expect(wrapper.find('.card-text').text()).toMatch('faculty description');
  });

  test('is a Vue instance', () => {
    const wrapper = shallowMount(CardComponent);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
