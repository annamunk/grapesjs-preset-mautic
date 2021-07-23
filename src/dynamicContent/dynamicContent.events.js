import DynamicContentCommands from './dynamicContent.commands';
import DynamicContentService from './dynamicContent.service';

export default class DynamicContentEvents {
  editor;

  dcService;

  constructor(editor) {
    this.editor = editor;
    this.dcService = new DynamicContentService(this.editor);
    this.dccmd = new DynamicContentCommands(this.editor);
  }

  // @todo merge events and listeners
  onComponentRemove() {
    this.editor.on('component:remove', (component) => {
      // Delete dynamic-content on Mautic side
      if (component.get('type') === 'dynamic-content') {
        this.editor.runCommand('preset-mautic:dynamic-content-delete-store-item', { component });
      }
    });
  }
}
