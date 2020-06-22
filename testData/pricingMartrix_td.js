import page from '../page-model'


class PricingMarix_td { 
	constructor () {
        this.defaultColumnsList = defaultColumnsList;
        this.possibleCheckboxAttributesCombinations = possibleCheckboxAttributesCombinations;
        this.pairedCheckboxAttributes = pairedCheckboxAttributes;
        this.requiredCheckboxAttribute = requiredCheckboxAttribute;
	}
}


class FieldAttributes {
    constructor (
        fieldHeader, charLimit, attachment, date, number, currency, percent, internalOnly, readOnly, response, required, calculation
         ) {
    this.list = {
        fieldHeader:	fieldHeader, 
        charLimit: 		charLimit, 
        attachment: 	attachment, 
        date: 			date, 
        number:			number, 
        currency: 		currency, 
        percent: 		percent, 
        internalOnly: 	internalOnly, 
        readOnly: 		readOnly, 
        response: 		response, 
        required: 		required, 
        calculation:	calculation }
}
}

class Column {
    constructor ( columnName, isRemovable, fieldAttributes ) {
        this.columnName      = columnName;
        this.locator         = page.pricingMatrix.arrangeColumns.column( columnName );
        this.isRemovable     = isRemovable;
        this.removeButton    = page.pricingMatrix.arrangeColumns.removeColumnButton( columnName );
        this.fieldAttributes = fieldAttributes;
    }
}

export class FieldAttributeText {
    constructor ( label, isEditable, isRequired, text ) {
        this.label = label;
        this.isEditable = isEditable;
        this.isRequired = isRequired;
        this.text = text;
        this.textField = page.pricingMatrix.fieldAttributes.textAttribute( label );
    }
}

export class FieldAttributeCheckbox {
    constructor ( label, isEditable, hasTooltip, isActive ) {
        this.label = label;
        this.isEditable = isEditable;
        this.hasTooltip = hasTooltip;
        this.isActive = isActive;
        this.checkbox = page.pricingMatrix.fieldAttributes.checkboxAttribute( label );
    }
}


const defaultColumnsList = [
			new Column( 'Line Item', false,
				new FieldAttributes(
	                //                           Label           Editable   Required    Text/Active
					new FieldAttributeText(     'Field header',  false,     true,       'Line Item' ),
					new FieldAttributeText(     'Char limit',    true,      true,       '255' ),
					new FieldAttributeCheckbox( 'Attachment',    false,     false,      false ),
					new FieldAttributeCheckbox( 'Date',          false,     false,      false ),
					new FieldAttributeCheckbox( 'Number',        false,     false,      false ),
					new FieldAttributeCheckbox( 'Currency',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Percent',       false,     false,      false ),
					new FieldAttributeCheckbox( 'Internal only', false,     false,      false ),
					new FieldAttributeCheckbox( 'Read only',     false,     false,      true  ),
					new FieldAttributeCheckbox( 'Response',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Required',      false,     false,      true  ),
					new FieldAttributeCheckbox( 'Calculation',   false,     false,      false )
			) ),
			new Column( 'Unit of measure', false,
				new FieldAttributes(
	                //                           Label           Editable   Required    Text/Active
					new FieldAttributeText(     'Field header',  false,     true,       'Unit of measure' ),
					new FieldAttributeText(     'Char limit',    null,      null,       null  ),
					new FieldAttributeCheckbox( 'Attachment',    false,     false,      false ),
					new FieldAttributeCheckbox( 'Date',          false,     false,      false ),
					new FieldAttributeCheckbox( 'Number',        false,     false,      false ),
					new FieldAttributeCheckbox( 'Currency',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Percent',       false,     false,      false ),
					new FieldAttributeCheckbox( 'Internal only', false,     false,      false ),
					new FieldAttributeCheckbox( 'Read only',     false,     false,      true  ),
					new FieldAttributeCheckbox( 'Response',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Required',      false,     false,      true  ),
					new FieldAttributeCheckbox( 'Calculation',   false,     false,      false )
			)),
			new Column( 'Quantity', false,
				new FieldAttributes(
					//                           Label           Editable   Required    Text/Active
					new FieldAttributeText(     'Field header',  false,     true,       'Quantity' ),
					new FieldAttributeText(     'Char limit',    true,      true,       '15'  ),
					new FieldAttributeCheckbox( 'Attachment',    false,     false,      false ),
					new FieldAttributeCheckbox( 'Date',          false,     false,      false ),
					new FieldAttributeCheckbox( 'Number',        false,     false,      true  ),
					new FieldAttributeCheckbox( 'Currency',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Percent',       false,     false,      false ),
					new FieldAttributeCheckbox( 'Internal only', false,     false,      false ),
					new FieldAttributeCheckbox( 'Read only',     false,     false,      true  ),
					new FieldAttributeCheckbox( 'Response',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Required',      false,     false,      true  ),
					new FieldAttributeCheckbox( 'Calculation',   false,     false,      false )
			)),
			new Column( 'Baseline price', true,
				new FieldAttributes(
					//                          Label            Editable   Required    Text/Active
					new FieldAttributeText(     'Field header',  false,     true,       'Baseline price' ),
					new FieldAttributeText(     'Char limit',    true,      true,       '15'  ),
					new FieldAttributeCheckbox( 'Attachment',    false,     false,      false ),
					new FieldAttributeCheckbox( 'Date',          false,     false,      false ),
					new FieldAttributeCheckbox( 'Number',        false,     false,      true  ),
					new FieldAttributeCheckbox( 'Currency',      false,     false,      true  ),
					new FieldAttributeCheckbox( 'Percent',       false,     false,      false ),
					new FieldAttributeCheckbox( 'Internal only', false,     false,      true  ),
					new FieldAttributeCheckbox( 'Read only',     false,     false,      false ),
					new FieldAttributeCheckbox( 'Response',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Required',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Calculation',   false,     false,      false )
			)),
			new Column( 'Unit price', false,
				new FieldAttributes(
					//                           Label           Editable   Required    Text/Active
					new FieldAttributeText(     'Field header',  false,     true,       'Unit price' ),
					new FieldAttributeText(     'Char limit',    true,      true,       '15'  ),
					new FieldAttributeCheckbox( 'Attachment',    false,     false,      false ),
					new FieldAttributeCheckbox( 'Date',          false,     false,      false ),
					new FieldAttributeCheckbox( 'Number',        false,     false,      true  ),
					new FieldAttributeCheckbox( 'Currency',      false,     false,      true  ),
					new FieldAttributeCheckbox( 'Percent',       false,     false,      false ),
					new FieldAttributeCheckbox( 'Internal only', false,     false,      false ),
					new FieldAttributeCheckbox( 'Read only',     false,     false,      false ),
					new FieldAttributeCheckbox( 'Response',      false,     false,      true  ),
					new FieldAttributeCheckbox( 'Required',      false,     false,      true  ),
					new FieldAttributeCheckbox( 'Calculation',   false,     false,      false )
			)),
			new Column( 'Currency', false,
				new FieldAttributes(
					//                           Label           Editable   Required    Text/Active
					new FieldAttributeText(     'Field header',  false,     true,       'Currency' ),
					new FieldAttributeText(     'Char limit',    null,      null,       null  ),
					new FieldAttributeCheckbox( 'Attachment',    false,     false,      false ),
					new FieldAttributeCheckbox( 'Date',          false,     false,      false ),
					new FieldAttributeCheckbox( 'Number',        false,     false,      false ),
					new FieldAttributeCheckbox( 'Currency',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Percent',       false,     false,      false ),
					new FieldAttributeCheckbox( 'Internal only', false,     false,      false ),
					new FieldAttributeCheckbox( 'Read only',     false,     false,      true  ),
					new FieldAttributeCheckbox( 'Response',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Required',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Calculation',   false,     false,      false )
			)),
			new Column( 'Commodity', false,
				new FieldAttributes(
					//                           Label           Editable   Required    Text/Active
					new FieldAttributeText(     'Field header',  false,     true,       'Commodity' ),
					new FieldAttributeText(     'Char limit',    null,      null,       null  ),
					new FieldAttributeCheckbox( 'Attachment',    false,     false,      false ),
					new FieldAttributeCheckbox( 'Date',          false,     false,      false ),
					new FieldAttributeCheckbox( 'Number',        false,     false,      false ),
					new FieldAttributeCheckbox( 'Currency',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Percent',       false,     false,      false ),
					new FieldAttributeCheckbox( 'Internal only', false,     false,      true  ),
					new FieldAttributeCheckbox( 'Read only',     false,     false,      false ),
					new FieldAttributeCheckbox( 'Response',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Required',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Calculation',   false,     false,      false )
			)),
			new Column( 'Extended baseline price', true,
				new FieldAttributes(
					//                           Label           Editable   Required    Text/Active
					new FieldAttributeText(     'Field header',  false,     true,       'Extended baseline price' ),
					new FieldAttributeText(     'Char limit',    null,      null,       null  ),
					new FieldAttributeCheckbox( 'Attachment',    false,     false,      false ),
					new FieldAttributeCheckbox( 'Date',          false,     false,      false ),
					new FieldAttributeCheckbox( 'Number',        false,     false,      true  ),
					new FieldAttributeCheckbox( 'Currency',      false,     false,      true  ),
					new FieldAttributeCheckbox( 'Percent',       false,     false,      false ),
					new FieldAttributeCheckbox( 'Internal only', false,     false,      true  ),
					new FieldAttributeCheckbox( 'Read only',     false,     false,      false ),
					new FieldAttributeCheckbox( 'Response',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Required',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Calculation',   false,     false,      true  )
			)),
			new Column( 'Extended unit price', true,
				new FieldAttributes(
					//                           Label           Editable   Required    Text/Active
					new FieldAttributeText(     'Field header',  false,     true,       'Extended unit price' ),
					new FieldAttributeText(     'Char limit',    null,      null,       null  ),
					new FieldAttributeCheckbox( 'Attachment',    false,     false,      false ),
					new FieldAttributeCheckbox( 'Date',          false,     false,      false ),
					new FieldAttributeCheckbox( 'Number',        false,     false,      true  ),
					new FieldAttributeCheckbox( 'Currency',      false,     false,      true  ),
					new FieldAttributeCheckbox( 'Percent',       false,     false,      false ),
					new FieldAttributeCheckbox( 'Internal only', false,     false,      false ),
					new FieldAttributeCheckbox( 'Read only',     false,     false,      true  ),
					new FieldAttributeCheckbox( 'Response',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Required',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Calculation',   false,     false,      true  )
			)),
			new Column( 'Savings', true,
				new FieldAttributes(
					//                           Label           Editable   Required    Text/Active
					new FieldAttributeText(     'Field header',  false,     true,       'Savings' ),
					new FieldAttributeText(     'Char limit',    null,      null,       null  ),
					new FieldAttributeCheckbox( 'Attachment',    false,     false,      false ),
					new FieldAttributeCheckbox( 'Date',          false,     false,      false ),
					new FieldAttributeCheckbox( 'Number',        false,     false,      true  ),
					new FieldAttributeCheckbox( 'Currency',      false,     false,      true  ),
					new FieldAttributeCheckbox( 'Percent',       false,     false,      false ),
					new FieldAttributeCheckbox( 'Internal only', false,     false,      true  ),
					new FieldAttributeCheckbox( 'Read only',     false,     false,      false ),
					new FieldAttributeCheckbox( 'Response',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Required',      false,     false,      false ),
					new FieldAttributeCheckbox( 'Calculation',   false,     false,      true  )
			))
        ];
            
        const possibleCheckboxAttributesCombinations = {
            'Default':       [ 'Attachment', 'Date', 'Number', 'Currency', 'Percent', 'Internal only', 'Read only', 'Response', 'Required', 'Calculation' ],
            'Attachment':    [                                                        'Internal only', 'Read only',             'Required'                ],
            'Date':          [                                                        'Internal only', 'Read only', 'Response', 'Required'                ],
            'Number':        [                                 'Currency', 'Percent', 'Internal only', 'Read only', 'Response', 'Required', 'Calculation' ],
            'Currency':      [                                                        'Internal only', 'Read only', 'Response', 'Required', 'Calculation' ],
            'Percent':       [                       	                              'Internal only', 'Read only', 'Response', 'Required', 'Calculation' ],
            'Internal only': [ 'Attachment', 'Date', 'Number', 'Currency', 'Percent',                                           'Required', 'Calculation' ],
            'Read only':     [ 'Attachment', 'Date', 'Number', 'Currency', 'Percent',                                           'Required', 'Calculation' ],
            'Response':      [               'Date', 'Number', 'Currency', 'Percent',                                           'Required'                ],
            'Required':      [ 'Attachment', 'Date', 'Number', 'Currency', 'Percent', 'Internal only', 'Read only', 'Response',                           ],
            'Calculation':   [                                 'Currency', 'Percent', 'Internal only', 'Read only'                                        ]
        }

        const pairedCheckboxAttributes = {
            'Currency':    [ 'Number' ],
            'Percent':     [ 'Number' ],
            'Calculation': [ 'Number' ]
        }

        const requiredCheckboxAttribute = [ 'Internal only', 'Read only', 'Response' ]



export default new PricingMarix_td();