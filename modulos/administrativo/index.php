<section class="separador">
    <div class="contenedor">
        <h1 class="titulo">Módulo Administrativo</h1>
    </div>
</section>
<article class="contenido">
    <div class="contenedor">
        <p>Busque estudiantes de acuerdo a los siguiente parámetros:</p>
        <br>
        <form id="escritorioSubmit" method="POST" action="<?php echo $app['basedir'].'/pdf/alumnos.pdf'; ?>" target="_blank">
            <table class="administrativo" id="escritorio">
                <tr>
                    <td>
                        <label>Profesor</label>
                        <select class="lista profesor">
                            <option value="">Desplegar lista</option>
                        </select>
                    </td>
                    <td>
                        <label>Período</label>
                        <select class="lista periodo">
                            <option value="">Desplegar lista</option>
                        </select>
                    </td>
                    <td>
                        <label>Materia</label>
                        <select class="lista materia">
                            <option value="">Desplegar lista</option>
                        </select>
                    </td>
                </tr>
                <tr class="espacio">
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td>
                        <label>Semestre</label>
                        <select class="lista semestre">
                            <option value="">Desplegar lista</option>
                            <option value="1">Primero</option>
                            <option value="2">Segundo</option>
                            <option value="3">Tercero</option>
                            <option value="4">Cuarto</option>
                            <option value="5">Quinto</option>
                            <option value="6">Sexto</option>
                            <option value="7">Séptimo</option>
                            <option value="8">Octávo</option>
                            <option value="9">Noveno</option>
                            <option value="10">Décimo</option>
                        </select>
                    </td>
                    <td>
                        <label>Créditos acumulados</label>
                        <input class="lista creditos">
                    </td>
                    <td>
                        <label>Condición de los créditos</label>
                        <select class="lista flag" disabled="disabled">
                            <option value="2">Menor</option>
                            <option value="0">Igual</option>
                            <option value="1">Mayor</option>
                        </select>
                    </td>
                </tr>
                <tr class="espacio">
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td colspan="3">
                        <label>
                            <input type="checkbox" class="resultados" value="todos">Mostrar todos los resultados</label>
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        <button class="buscar" type="button">
                            <i class="fa fa-search"></i>Buscar</button>
                    </td>
                </tr>
                <tr class="espacio">
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td colspan="3">
                            <i class="fa fa-download"></i><input type="submit" value="Descargar en PDF">
                    </td>
                </tr>
            </table>
        </form>
        <form id="generalSubmit" method="POST" action="<?php echo $app['basedir'].'/pdf/alumnos.pdf'; ?>" target="_blank">
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
                        <label>Semestre</label>
                        <select class="lista semestre">
                            <option value="">Desplegar lista</option>
                            <option value="1">Primero</option>
                            <option value="2">Segundo</option>
                            <option value="3">Tercero</option>
                            <option value="4">Cuarto</option>
                            <option value="5">Quinto</option>
                            <option value="6">Sexto</option>
                            <option value="7">Séptimo</option>
                            <option value="8">Octávo</option>
                            <option value="9">Noveno</option>
                            <option value="10">Décimo</option>
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
                    <td colspan="3">
                        <br>
                        <label>
                            <input type="checkbox" class="resultados" value="todos">Mostrar todos los resultados</label>
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        <button class="buscar" type="button">
                            <i class="fa fa-search"></i>Buscar</button>
                    </td>
                </tr>
                <tr class="espacio">
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td colspan="3">
                            <i class="fa fa-download"></i><input type="submit" value="Descargar en PDF">
                    </td>
                </tr>
            </table>
        </form>
        <div id="status">Solicitando información...</div>
        <div class="informacion"></div>
        <table class="letras">
        </table>
        <div class="lista-letras"></div>
        <table class="estudiantes">
        </table>
    </div>
</article>