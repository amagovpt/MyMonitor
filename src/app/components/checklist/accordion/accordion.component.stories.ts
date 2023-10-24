import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { AccordionComponent } from './accordion.component';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteMock } from './activated-route-mock';
const meta: Meta<AccordionComponent> = {
  title: 'Accordion',
  component: AccordionComponent,
  tags: ['autodocs'],
  render: (args: AccordionComponent) => ({
    props: {
      ...args,
    },
  }),
  decorators: [
    moduleMetadata({
      declarations: [AccordionComponent],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
      ],
    }),
  ]
};

export default meta;
type Story = StoryObj<AccordionComponent>;

export const Default: Story = {
  
  args: {
    content: '',
    selectedValue: '',
    id: 2,
    title: '',
    description: '',
    editorId: '',
    isPreview: false
  },
};
