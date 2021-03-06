import React from "react";
import { Layout } from "../../../../templates/layout";

export const Category = () => (
	<Layout>
		<header>
			<h1>Категории</h1>
		</header>

		<section>
			<h3>Аристотеля</h3>

			<p>
				Пересечение категорий с грамматическими частями речи не случайно и интересно для
				дальнейших исследований.
			</p>

			<dl>
				<dt>Сущность (субстанция)</dt>
				<dd>Существительное (Аристотель, человек, категория).</dd>
				<dt>Количество</dt>
				<dd>Числительное (один, несколько). Пространственно-числовые характеристики.</dd>
				<dt>Качество</dt>
				<dd>Прилагательное (старый, молодой). Неколичественные свойства предмета.</dd>
				<dt>Отношение</dt>
				<dd>
					Степени сравнения (первый, последний, выше других). Способ, которым предметы
					могут быть связаны между собой.
				</dd>
				<dt>Место</dt>
				<dd>Наречие места (на улице, под горой).</dd>
				<dt>Время</dt>
				<dd>Наречие времени (сегодня, вчера).</dd>
				<dt>Состояние, положение</dt>
				<dd>
					Непереходный глагол (стоит, лежит). Положение частей предмета друг относительно
					друга.
				</dd>
				<dt>Обладание</dt>
				<dd>
					Греческий перфект страдательного залога (одет, разут). Наличие постоянного
					внешнего обстоятельства.
				</dd>
				<dt>Действие</dt>
				<dd>
					Глагол действительного залога (бежит, побеждает). Произведение изменений в
					некотором другом предмете.
				</dd>
				<dt>Претерпевание</dt>
				<dd>
					Глагол страдательного залога (его гонят, избивают). Принятие изменения от
					некоторого другого предмета. Оппозиционно действию.
				</dd>
			</dl>
		</section>
	</Layout>
);

export default Category;
