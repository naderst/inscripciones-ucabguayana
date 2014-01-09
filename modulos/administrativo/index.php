<section class="separador">
    <div class="contenedor">
        <h1 class="titulo">Módulo Administrativo</h1>
    </div>
</section>
<article class="contenido">
    <div class="contenedor">
        <p>Busque estudiantes de acuerdo a los siguiente parámetros:</p>
        <br>
        <table class="administrativo">
            <tr>
                <td>
                    <label>Profesor</label>
                    <br>
                    <select class="lista profesor">
                        <option value="">Desplegar lista</option>
                    </select>
                </td>
                <td>
                    <label>Período</label>
                    <br>
                    <select class="lista periodo">
                        <option value="">Desplegar lista</option>
                    </select>
                </td>
                <td>
                    <label>Materia</label>
                    <br>
                    <select class="lista materia">
                        <option value="">Desplegar lista</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>
                    <br>
                    <label>Créditos acumulados</label>
                    <input class="lista creditos">
                </td>
                <td>
                    <br>
                    <label>Condición de los créditos</label>
                    <select class="lista flag" disabled="disabled">
                        <option value="2">Menor</option>
                        <option value="0">Igual</option>
                        <option value="1">Mayor</option>
                    </select>
                </td>
                <td>
                    <br>
                    <label>
                        <input type="checkbox" class="resultados" value="todos">Mostrar todos los resultados</label>
                </td>
            </tr>
            <tr>
                <td>
                    <button class="buscar" type="button">
                        <i class="fa fa-search"></i>Buscar</button>
                </td>
            </tr>
        </table>
        <table class="administrativo" id="general">
            <tr>
                <td>
                    <label>Profesor</label>
                    <select class="lista profesor">
                        <option value="">Desplegar lista</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>
                    <br>
                    <label>Período</label>
                    <select class="lista periodo">
                        <option value="">Desplegar lista</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>
                    <br>
                    <label>Materia</label>
                    <select class="lista materia">
                        <option value="">Desplegar lista</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>
                    <br>
                    <label>Créditos acumulados</label>
                    <input class="lista creditos">
                </td>
            </tr>
            <tr>
                <td>
                    <br>
                    <label>Condición de los créditos</label>
                    <select class="lista flag" disabled="disabled">
                        <option value="2">Menor</option>
                        <option value="0">Igual</option>
                        <option value="1">Mayor</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>
                    <br>
                    <label>
                        <input type="checkbox" class="resultados" value="todos">Mostrar todos los resultados</label>
                </td>
            </tr>
            <tr>
                <td>
                    <button class="buscar" type="button">
                        <i class="fa fa-search"></i>Buscar</button>
                </td>
            </tr>
        </table>
        <div id="status">Solicitando información...</div>
        <div class="informacion"></div>
        <table class="letras">
        </table>
        <div class="lista-letras"></div>
        <table class="estudiantes">
        </table>
    </div>
</article>