

describe('проверяем доступность приложения, перехват запроса api', function() {

    beforeEach(() => {
        // Загрузка моковых данных
        // cy.fixture('ingredients.json').then((mockIngredients) => {
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
        cy.viewport(1300, 800);
        cy.visit('http://localhost:4000/'); 
    });
      
    it('сервис должен быть доступен по адресу localhost:5173', function() {
        // cy.wait('@getIngredients');
        const bun = cy.get(`[data-cy="643d69a5c3f7b9001cfa093c"]`);
        bun.find('button').should('be.visible').click();
        const topBun = cy.get(`[data-cy="top-bun"]`);
        topBun.contains('Краторная булка N-200i');
    });
})