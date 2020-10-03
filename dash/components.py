import dash_bootstrap_components as dbc
import dash_core_components as dcc
import dash_html_components as html

def generate_card(body_contents=[]):
    return dbc.Card(
        [
            dbc.CardBody(
                body_contents,
                style={"font-size": "1.5em"}
            ),
        ],
        style={"border-radius": "10px", "box-shadow" : "2px 2px 2px lightgrey"},
    )

def generate_dropdown(label, id, options, multi=False, default_value=None):
    return html.Div([html.P(
            label,
            className="card-text",
        ),
        dcc.Dropdown(id=id,
            options=options,
            multi=multi,
            value=default_value,
            style={'width': "90%"}
        )])