export default function ListTags() {
  return (
    <div id="wd-lists">
      <h4>List Tags</h4>
      <h5>Ordered List Tag</h5>
      How to make pancakes:
      <ol id="wd-pancakes">
        <li>Mix dry ingredients.</li>
        <li>Add wet ingredients.</li>
        <li>Stir to combine.</li>
        <li>Heat a skillet or griddle.</li>
        <li>Pour batter onto the skillet.</li>
        <li>Cook until bubbly on top.</li>
        <li>Flip and cook the other side.</li>
        <li>Serve and enjoy!</li>
      </ol>
      <h5>Unordered List Tag</h5>
      My favorite books (in no particular order)
      <ul id="wd-my-books">
        <li>Dune</li>
        <li>Lord of the Rings</li>
        <li>Ender&apos;s Game</li>
        <li>Red Mars</li>
        <li>The Forever War</li>
      </ul>
      <h5>My actual favorite recipe</h5>
      How to make scrambled eggs
      <ol id="wd-your-favorite-recipe">
        <li>Gather all ingredients.</li>
        <li>
          Whisk eggs in a small bowl until smooth. Mix in ham, Cheddar cheese,
          and heavy cream.
        </li>
        <li>
          Melt butter in a skillet over medium heat. Pour in egg mixture; cook
          and stir until set but still moist, 3 to 5 minutes.
        </li>
      </ol>
      <h5>My actual favorite books</h5>
      <ul id="wd-your-books">
        <li>Walden</li>
        <li>A Tale of Two Cities</li>
        <li>Les Misérables</li>
        <li>The Three-Body Problem (Series)</li>
      </ul>
      <h5>Five common HTML tags</h5>
      <ul id="wd-ai-html-tags">
        <li>
          Heading tags <code>&lt;h1&gt;</code> through <code>&lt;h6&gt;</code>{" "}
          label sections of a page, h1 being the most important:
          <br />
          <code>&lt;h2&gt;List Tags&lt;/h2&gt;</code>
        </li>
        <li>
          The paragraph tag <code>&lt;p&gt;</code> wraps a block of text so the
          browser renders vertical space around it:
          <br />
          <code>&lt;p&gt;How to make pancakes.&lt;/p&gt;</code>
        </li>
        <li>
          The ordered list tag <code>&lt;ol&gt;</code> numbers its{" "}
          <code>&lt;li&gt;</code> items, so use it when sequence matters:
          <br />
          <code>
            &lt;ol&gt;&lt;li&gt;Mix dry ingredients.&lt;/li&gt;&lt;li&gt;Add wet
            ingredients.&lt;/li&gt;&lt;/ol&gt;
          </code>
        </li>
        <li>
          The unordered list tag <code>&lt;ul&gt;</code> bullets its{" "}
          <code>&lt;li&gt;</code> items, for collections with no particular
          order:
          <br />
          <code>
            &lt;ul&gt;&lt;li&gt;Dune&lt;/li&gt;&lt;li&gt;Red
            Mars&lt;/li&gt;&lt;/ul&gt;
          </code>
        </li>
        <li>
          The table tag <code>&lt;table&gt;</code> lays out rows{" "}
          <code>&lt;tr&gt;</code> of header <code>&lt;th&gt;</code> and data{" "}
          <code>&lt;td&gt;</code> cells for two dimensional data:
          <br />
          <code>
            &lt;table&gt;&lt;tr&gt;&lt;th&gt;Book&lt;/th&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td&gt;Walden&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;
          </code>
        </li>
      </ul>
    </div>
  );
}
