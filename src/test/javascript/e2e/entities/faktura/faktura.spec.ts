import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { FakturaComponentsPage, FakturaDeleteDialog, FakturaUpdatePage } from './faktura.page-object';

const expect = chai.expect;

describe('Faktura e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let fakturaComponentsPage: FakturaComponentsPage;
  let fakturaUpdatePage: FakturaUpdatePage;
  let fakturaDeleteDialog: FakturaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Fakturas', async () => {
    await navBarPage.goToEntity('faktura');
    fakturaComponentsPage = new FakturaComponentsPage();
    await browser.wait(ec.visibilityOf(fakturaComponentsPage.title), 5000);
    expect(await fakturaComponentsPage.getTitle()).to.eq('fakturobot2App.faktura.home.title');
    await browser.wait(ec.or(ec.visibilityOf(fakturaComponentsPage.entities), ec.visibilityOf(fakturaComponentsPage.noResult)), 1000);
  });

  it('should load create Faktura page', async () => {
    await fakturaComponentsPage.clickOnCreateButton();
    fakturaUpdatePage = new FakturaUpdatePage();
    expect(await fakturaUpdatePage.getPageTitle()).to.eq('fakturobot2App.faktura.home.createOrEditLabel');
    await fakturaUpdatePage.cancel();
  });

  it('should create and save Fakturas', async () => {
    const nbButtonsBeforeCreate = await fakturaComponentsPage.countDeleteButtons();

    await fakturaComponentsPage.clickOnCreateButton();

    await promise.all([
      fakturaUpdatePage.setNumerFakturyInput('numerFaktury'),
      fakturaUpdatePage.setKwotaFakturyInput('5'),
      fakturaUpdatePage.setDataFakturyInput('2000-12-31'),
      fakturaUpdatePage.typFakturySelectLastOption(),
      fakturaUpdatePage.statusFakturySelectLastOption(),
      fakturaUpdatePage.zalegloscFakturySelectLastOption(),
      fakturaUpdatePage.kontrachentSelectLastOption(),
    ]);

    expect(await fakturaUpdatePage.getNumerFakturyInput()).to.eq(
      'numerFaktury',
      'Expected NumerFaktury value to be equals to numerFaktury'
    );
    expect(await fakturaUpdatePage.getKwotaFakturyInput()).to.eq('5', 'Expected kwotaFaktury value to be equals to 5');
    expect(await fakturaUpdatePage.getDataFakturyInput()).to.eq('2000-12-31', 'Expected dataFaktury value to be equals to 2000-12-31');

    await fakturaUpdatePage.save();
    expect(await fakturaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await fakturaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Faktura', async () => {
    const nbButtonsBeforeDelete = await fakturaComponentsPage.countDeleteButtons();
    await fakturaComponentsPage.clickOnLastDeleteButton();

    fakturaDeleteDialog = new FakturaDeleteDialog();
    expect(await fakturaDeleteDialog.getDialogTitle()).to.eq('fakturobot2App.faktura.delete.question');
    await fakturaDeleteDialog.clickOnConfirmButton();

    expect(await fakturaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
