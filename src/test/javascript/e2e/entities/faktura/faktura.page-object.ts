import { element, by, ElementFinder } from 'protractor';

export class FakturaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-faktura div table .btn-danger'));
  title = element.all(by.css('jhi-faktura div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class FakturaUpdatePage {
  pageTitle = element(by.id('jhi-faktura-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  numerFakturyInput = element(by.id('field_numerFaktury'));
  kwotaFakturyInput = element(by.id('field_kwotaFaktury'));
  dataFakturyInput = element(by.id('field_dataFaktury'));
  typFakturySelect = element(by.id('field_typFaktury'));
  statusFakturySelect = element(by.id('field_statusFaktury'));
  zalegloscFakturySelect = element(by.id('field_zalegloscFaktury'));

  kontrachentSelect = element(by.id('field_kontrachent'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNumerFakturyInput(numerFaktury: string): Promise<void> {
    await this.numerFakturyInput.sendKeys(numerFaktury);
  }

  async getNumerFakturyInput(): Promise<string> {
    return await this.numerFakturyInput.getAttribute('value');
  }

  async setKwotaFakturyInput(kwotaFaktury: string): Promise<void> {
    await this.kwotaFakturyInput.sendKeys(kwotaFaktury);
  }

  async getKwotaFakturyInput(): Promise<string> {
    return await this.kwotaFakturyInput.getAttribute('value');
  }

  async setDataFakturyInput(dataFaktury: string): Promise<void> {
    await this.dataFakturyInput.sendKeys(dataFaktury);
  }

  async getDataFakturyInput(): Promise<string> {
    return await this.dataFakturyInput.getAttribute('value');
  }

  async setTypFakturySelect(typFaktury: string): Promise<void> {
    await this.typFakturySelect.sendKeys(typFaktury);
  }

  async getTypFakturySelect(): Promise<string> {
    return await this.typFakturySelect.element(by.css('option:checked')).getText();
  }

  async typFakturySelectLastOption(): Promise<void> {
    await this.typFakturySelect.all(by.tagName('option')).last().click();
  }

  async setStatusFakturySelect(statusFaktury: string): Promise<void> {
    await this.statusFakturySelect.sendKeys(statusFaktury);
  }

  async getStatusFakturySelect(): Promise<string> {
    return await this.statusFakturySelect.element(by.css('option:checked')).getText();
  }

  async statusFakturySelectLastOption(): Promise<void> {
    await this.statusFakturySelect.all(by.tagName('option')).last().click();
  }

  async setZalegloscFakturySelect(zalegloscFaktury: string): Promise<void> {
    await this.zalegloscFakturySelect.sendKeys(zalegloscFaktury);
  }

  async getZalegloscFakturySelect(): Promise<string> {
    return await this.zalegloscFakturySelect.element(by.css('option:checked')).getText();
  }

  async zalegloscFakturySelectLastOption(): Promise<void> {
    await this.zalegloscFakturySelect.all(by.tagName('option')).last().click();
  }

  async kontrachentSelectLastOption(): Promise<void> {
    await this.kontrachentSelect.all(by.tagName('option')).last().click();
  }

  async kontrachentSelectOption(option: string): Promise<void> {
    await this.kontrachentSelect.sendKeys(option);
  }

  getKontrachentSelect(): ElementFinder {
    return this.kontrachentSelect;
  }

  async getKontrachentSelectedOption(): Promise<string> {
    return await this.kontrachentSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class FakturaDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-faktura-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-faktura'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
