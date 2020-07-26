import { element, by, ElementFinder } from 'protractor';

export class KontrachentComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-kontrachent div table .btn-danger'));
  title = element.all(by.css('jhi-kontrachent div h2#page-heading span')).first();
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

export class KontrachentUpdatePage {
  pageTitle = element(by.id('jhi-kontrachent-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nazwaKontrachentaInput = element(by.id('field_nazwaKontrachenta'));
  emailKontrachentaInput = element(by.id('field_emailKontrachenta'));
  numerKontrachentaInput = element(by.id('field_numerKontrachenta'));
  terminKontrachentaInput = element(by.id('field_terminKontrachenta'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNazwaKontrachentaInput(nazwaKontrachenta: string): Promise<void> {
    await this.nazwaKontrachentaInput.sendKeys(nazwaKontrachenta);
  }

  async getNazwaKontrachentaInput(): Promise<string> {
    return await this.nazwaKontrachentaInput.getAttribute('value');
  }

  async setEmailKontrachentaInput(emailKontrachenta: string): Promise<void> {
    await this.emailKontrachentaInput.sendKeys(emailKontrachenta);
  }

  async getEmailKontrachentaInput(): Promise<string> {
    return await this.emailKontrachentaInput.getAttribute('value');
  }

  async setNumerKontrachentaInput(numerKontrachenta: string): Promise<void> {
    await this.numerKontrachentaInput.sendKeys(numerKontrachenta);
  }

  async getNumerKontrachentaInput(): Promise<string> {
    return await this.numerKontrachentaInput.getAttribute('value');
  }

  async setTerminKontrachentaInput(terminKontrachenta: string): Promise<void> {
    await this.terminKontrachentaInput.sendKeys(terminKontrachenta);
  }

  async getTerminKontrachentaInput(): Promise<string> {
    return await this.terminKontrachentaInput.getAttribute('value');
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

export class KontrachentDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-kontrachent-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-kontrachent'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
