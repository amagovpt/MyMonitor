import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { AccordionComponent } from './accordion.component';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteMock } from './activated-route-mock';
import '../../../../../node_modules/@angular/material/';
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
    content: 'Um texto grande aqui',
    selectedValue: 'S',
    id: 2,
    title: 'O Titulo do accordion',
    description: 'A descrição da parada',
    editorId: '1',
    isPreview: false
  },
};
