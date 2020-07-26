import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { KontrachentComponentsPage, KontrachentDeleteDialog, KontrachentUpdatePage } from './kontrachent.page-object';

const expect = chai.expect;

describe('Kontrachent e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let kontrachentComponentsPage: KontrachentComponentsPage;
  let kontrachentUpdatePage: KontrachentUpdatePage;
  let kontrachentDeleteDialog: KontrachentDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Kontrachents', async () => {
    await navBarPage.goToEntity('kontrachent');
    kontrachentComponentsPage = new KontrachentComponentsPage();
    await browser.wait(ec.visibilityOf(kontrachentComponentsPage.title), 5000);
    expect(await kontrachentComponentsPage.getTitle()).to.eq('fakturobot2App.kontrachent.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(kontrachentComponentsPage.entities), ec.visibilityOf(kontrachentComponentsPage.noResult)),
      1000
    );
  });

  it('should load create Kontrachent page', async () => {
    await kontrachentComponentsPage.clickOnCreateButton();
    kontrachentUpdatePage = new KontrachentUpdatePage();
    expect(await kontrachentUpdatePage.getPageTitle()).to.eq('fakturobot2App.kontrachent.home.createOrEditLabel');
    await kontrachentUpdatePage.cancel();
  });

  it('should create and save Kontrachents', async () => {
    const nbButtonsBeforeCreate = await kontrachentComponentsPage.countDeleteButtons();

    await kontrachentComponentsPage.clickOnCreateButton();

    await promise.all([
      kontrachentUpdatePage.setNazwaKontrachentaInput('nazwaKontrachenta'),
      kontrachentUpdatePage.setEmailKontrachentaInput('emailKontrachenta'),
      kontrachentUpdatePage.setNumerKontrachentaInput('numerKontrachenta'),
      kontrachentUpdatePage.setTerminKontrachentaInput('5'),
    ]);

    expect(await kontrachentUpdatePage.getNazwaKontrachentaInput()).to.eq(
      'nazwaKontrachenta',
      'Expected NazwaKontrachenta value to be equals to nazwaKontrachenta'
    );
    expect(await kontrachentUpdatePage.getEmailKontrachentaInput()).to.eq(
      'emailKontrachenta',
      'Expected EmailKontrachenta value to be equals to emailKontrachenta'
    );
    expect(await kontrachentUpdatePage.getNumerKontrachentaInput()).to.eq(
      'numerKontrachenta',
      'Expected NumerKontrachenta value to be equals to numerKontrachenta'
    );
    expect(await kontrachentUpdatePage.getTerminKontrachentaInput()).to.eq('5', 'Expected terminKontrachenta value to be equals to 5');

    await kontrachentUpdatePage.save();
    expect(await kontrachentUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await kontrachentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Kontrachent', async () => {
    const nbButtonsBeforeDelete = await kontrachentComponentsPage.countDeleteButtons();
    await kontrachentComponentsPage.clickOnLastDeleteButton();

    kontrachentDeleteDialog = new KontrachentDeleteDialog();
    expect(await kontrachentDeleteDialog.getDialogTitle()).to.eq('fakturobot2App.kontrachent.delete.question');
    await kontrachentDeleteDialog.clickOnConfirmButton();

    expect(await kontrachentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
